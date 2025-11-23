import React from 'react'
import FeatureCard from './FeatureCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import HealingIcon from '@mui/icons-material/Healing';

function Features() {
    return (
        <section id="features" className="py-12">
            <div className="max-w-6xl mx-auto px-4">
                <header className="mb-8 text-center">
                    <h2 className="text-blue-600 text-3xl md:text-4xl font-serif font-extrabold">What We Do</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Tools and services designed to make healthcare faster, simpler and more personal.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <FeatureCard icon={<CalendarMonthIcon/>} title={"Book Appointments Instantly"}
                        text={"No phone calls — choose your doctor and available time slot in seconds"}>
                    </FeatureCard>


                    <FeatureCard icon={<SearchIcon/>} title={"Find Specialists Near You"}
                        text={"Filter doctors by specialty, hospital, and location to find the right care"}>
                    </FeatureCard>

                    <FeatureCard icon={<PaymentIcon/>} title={"Secure Payments & Billing"}
                        text={"Pay invoices securely and view billing history in one place."}>
                    </FeatureCard>

                    <FeatureCard icon={<HealingIcon/>} title={"Telehealth Visits"}
                        text={"Connect with providers by video for quick consults and follow-ups"}>
                    </FeatureCard>

                </div>

            </div>
        </section>
    )
}

export default Features