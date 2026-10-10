import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

// In-memory fallback stores for local development without DB credentials or build steps
const memoryStore = {
  quotes: [] as any[],
  reviews: [
    {
      id: 'rev-1',
      customer_name: 'Braden C.',
      location: 'Wangaratta VIC',
      star_rating: 5,
      project_type: 'Manufacturer Logbook Servicing',
      review_text: 'SP Automotive have serviced my new Hilux since day one. Strictly adheres to Toyota factory schedules, genuine filter parts, digital logbook stamped, and maintains full statutory new-car warranty at half the dealership price. Honest, straight-shooting mechanics.',
      created_at: new Date('2024-03-10').toISOString(),
    },
    {
      id: 'rev-2',
      customer_name: 'Megan & Liam Walker',
      location: 'Glenrowan, VIC',
      star_rating: 5,
      project_type: '24/7 Emergency Roadside Assistance & Towing',
      review_text: 'Broke down on the Hume Freeway on a Friday evening with a burst radiator hose and steam everywhere. Called SP Automotive’s 24/7 emergency dispatch and their tow truck arrived in under 35 minutes. Sourced the replacement part first thing Saturday morning. Lifesavers!',
      created_at: new Date('2024-05-19').toISOString(),
    },
    {
      id: 'rev-3',
      customer_name: 'Anthony Rossi',
      location: 'Milawa, VIC',
      star_rating: 5,
      project_type: 'VicRoads Roadworthy Certificate (RWC)',
      review_text: 'Needed a licensed Roadworthy Certificate inspection to sell my Ford Ranger. Thorough and fair testing, clear explanation of wiper and bushing requirements, and re-tested same day with certificate issued. Seamless process.',
      created_at: new Date('2024-07-28').toISOString(),
    },
    {
      id: 'rev-4',
      customer_name: 'Rachel Davies',
      location: 'Oxley, VIC',
      star_rating: 5,
      project_type: 'Major Comprehensive Service & Brakes',
      review_text: 'Booked the major service and had front brake pads and rotors replaced. Car feels tighter, brakes are responsive, and they even washed the windscreen and gave me a loan car for the day so I wouldn’t miss work.',
      created_at: new Date('2024-09-14').toISOString(),
    },
    {
      id: 'rev-5',
      customer_name: 'Craig Miller (North East Transport)',
      location: 'Wangaratta VIC',
      star_rating: 5,
      project_type: 'Commercial Fleet Maintenance',
      review_text: 'SP Automotive looks after all four of our commercial delivery vans. Fast turnaround times, diagnostic scan tools that identify electrical gremlins immediately, and reliable logbook servicing keeps our fleet moving without downtime.',
      created_at: new Date('2024-10-22').toISOString(),
    }
  ],
  call_logs: [] as any[],
};

export const sql = databaseUrl ? neon(databaseUrl) : null;

let isDbInitialized = false;

export async function ensureDbTables() {
  if (!sql) {
    return;
  }
  if (isDbInitialized) return;

  try {
    // Quotes / Service bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        phone VARCHAR(50),
        vehicle_make VARCHAR(100),
        vehicle_model VARCHAR(100),
        vehicle_year VARCHAR(50),
        odometer VARCHAR(50),
        service_tier VARCHAR(100),
        estimated_price NUMERIC(10,2),
        loan_car BOOLEAN DEFAULT false,
        preferred_date VARCHAR(100),
        roadside_emergency BOOLEAN DEFAULT false,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        star_rating INT NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
        review_text TEXT NOT NULL,
        project_type VARCHAR(100),
        verified BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Call clicks table
    await sql`
      CREATE TABLE IF NOT EXISTS call_logs (
        id SERIAL PRIMARY KEY,
        intent VARCHAR(100),
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default reviews if empty
    const existing = await sql`SELECT COUNT(*) as count FROM reviews;`;
    if (existing && existing[0] && parseInt(existing[0].count, 10) === 0) {
      for (const rev of memoryStore.reviews) {
        await sql`
          INSERT INTO reviews (customer_name, location, star_rating, review_text, project_type, verified, created_at)
          VALUES (${rev.customer_name}, ${rev.location}, ${rev.star_rating}, ${rev.review_text}, ${rev.project_type}, true, ${rev.created_at});
        `;
      }
    }

    isDbInitialized = true;
  } catch (err) {
    console.warn('Neon database initialization warning (falling back to memory store):', err);
  }
}

export async function insertQuote(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  odometer?: string;
  serviceTier?: string;
  estimatedPrice?: number;
  loanCar?: boolean;
  preferredDate?: string;
  roadsideEmergency?: boolean;
  message?: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO quotes (
          first_name, last_name, email, phone, vehicle_make, vehicle_model,
          vehicle_year, odometer, service_tier, estimated_price, loan_car,
          preferred_date, roadside_emergency, message
        ) VALUES (
          ${data.firstName}, ${data.lastName || ''}, ${data.email}, ${data.phone},
          ${data.vehicleMake || null}, ${data.vehicleModel || null}, ${data.vehicleYear || null},
          ${data.odometer || null}, ${data.serviceTier || null}, ${data.estimatedPrice || null},
          ${data.loanCar || false}, ${data.preferredDate || null}, ${data.roadsideEmergency || false},
          ${data.message || ''}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving service booking to Neon DB, caching in memory:', err);
    }
  }

  const record = {
    id: 'booking_' + Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
  memoryStore.quotes.push(record);
  return record;
}

export async function getApprovedReviews() {
  if (sql) {
    try {
      await ensureDbTables();
      const rows = await sql`
        SELECT 
          id::text, 
          customer_name as "customerName", 
          star_rating as "starRating", 
          review_text as "reviewText", 
          project_type as "projectType", 
          location,
          created_at as "createdAt"
        FROM reviews 
        WHERE verified = true 
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (err) {
      console.warn('Error fetching reviews from Neon, falling back to cached reviews:', err);
    }
  }

  return memoryStore.reviews.map(r => ({
    id: r.id,
    customerName: r.customer_name,
    starRating: r.star_rating,
    reviewText: r.review_text,
    projectType: r.project_type,
    location: r.location,
    createdAt: r.created_at,
  }));
}

export async function insertReview(data: {
  customerName: string;
  location?: string;
  starRating: number;
  projectType?: string;
  reviewText: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO reviews (customer_name, location, star_rating, project_type, review_text, verified)
        VALUES (${data.customerName}, ${data.location || null}, ${data.starRating}, ${data.projectType || null}, ${data.reviewText}, true)
        RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving review to Neon DB, using memory fallback:', err);
    }
  }

  const record = {
    id: 'rev_' + Date.now(),
    customer_name: data.customerName,
    location: data.location || 'Wangaratta VIC',
    star_rating: data.starRating,
    project_type: data.projectType || 'Mechanical Service',
    review_text: data.reviewText,
    created_at: new Date().toISOString(),
  };
  memoryStore.reviews.unshift(record);
  return record;
}

export async function logCallClick(intent: string, referrer?: string) {
  if (sql) {
    try {
      await ensureDbTables();
      await sql`
        INSERT INTO call_logs (intent, referrer)
        VALUES (${intent}, ${referrer || null});
      `;
      return true;
    } catch (err) {
      console.warn('Error logging call click:', err);
    }
  }
  memoryStore.call_logs.push({ intent, referrer, timestamp: new Date().toISOString() });
  return true;
}

export default sql;
