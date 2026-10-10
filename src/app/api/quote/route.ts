import { NextResponse } from 'next/server';
import { insertQuote } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      odometer,
      serviceTier,
      estimatedPrice,
      loanCar,
      roadsideEmergency,
      preferredDate,
      message
    } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Phone).' },
        { status: 400 }
      );
    }

    const saved = await insertQuote({
      firstName,
      lastName: lastName || '',
      email,
      phone,
      vehicleMake: vehicleMake || 'Unspecified',
      vehicleModel: vehicleModel || 'Unspecified',
      vehicleYear: vehicleYear || '',
      odometer: odometer || '',
      serviceTier: serviceTier || 'Manufacturer Logbook Service',
      estimatedPrice: estimatedPrice ? Number(estimatedPrice) : undefined,
      loanCar: Boolean(loanCar),
      roadsideEmergency: Boolean(roadsideEmergency),
      preferredDate: preferredDate || '',
      message: message || '',
    });

    return NextResponse.json({
      success: true,
      quote: saved,
      message: 'Thank you! Your service booking request has been received. Our workshop service advisor will contact you shortly.',
    });
  } catch (error: any) {
    console.error('API /api/quote error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit service booking.' },
      { status: 500 }
    );
  }
}
