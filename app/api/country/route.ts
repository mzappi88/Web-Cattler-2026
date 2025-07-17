import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the client's IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    let ip = forwarded?.split(',')[0] || realIp || 'unknown';

    console.log('🌍 API Route - Client IP:', ip);

    // Handle localhost and unknown IPs
    if (ip === 'unknown' || ip === 'localhost' || ip === '127.0.0.1' || ip === '::1') {
      console.log('🌍 API Route - Localhost/unknown IP detected, using fallback');
      return NextResponse.json({
        success: false,
        error: 'Localhost or unknown IP detected',
        fallback: {
          country_code: 'US', // Default fallback for localhost
          country_name: 'United States',
          message: 'Using fallback data for localhost/unknown IP'
        }
      }, { status: 200 });
    }

    // Try multiple APIs for better reliability
    let countryData = null;
    
    // Try ipapi.co first
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(3000)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🌍 API Route - ipapi.co Response:', data);
        
        if (data.country_code && data.country_code !== 'null') {
          countryData = data;
        }
      }
    } catch (error) {
      console.log('🌍 API Route - ipapi.co failed:', error);
    }

    // If ipapi.co failed, try ip-api.com
    if (!countryData) {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`, {
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('🌍 API Route - ip-api.com Response:', data);
          
          if (data.countryCode && data.status === 'success') {
            countryData = {
              country_code: data.countryCode,
              country_name: data.country,
              region: data.regionName,
              city: data.city,
              timezone: data.timezone,
              org: data.isp
            };
          }
        }
      } catch (error) {
        console.log('🌍 API Route - ip-api.com failed:', error);
      }
    }

    // If we got country data, return it
    if (countryData) {
      return NextResponse.json({
        success: true,
        ip: ip,
        country_code: countryData.country_code,
        country_name: countryData.country_name,
        region: countryData.region,
        city: countryData.city,
        timezone: countryData.timezone,
        org: countryData.org
      });
    }

    // If all APIs failed, return fallback
    console.log('🌍 API Route - All APIs failed, using fallback');
    return NextResponse.json({
      success: false,
      error: 'All country detection APIs failed',
      fallback: {
        country_code: 'US', // Default fallback
        country_name: 'United States',
        message: 'Using fallback data due to API errors'
      }
    }, { status: 200 });

  } catch (error) {
    console.error('🌍 API Route - Error:', error);
    
    // Return fallback data
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: {
        country_code: 'US', // Default fallback
        country_name: 'United States',
        message: 'Using fallback data due to API error'
      }
    }, { status: 200 }); // Return 200 even on error to avoid CORS issues
  }
} 