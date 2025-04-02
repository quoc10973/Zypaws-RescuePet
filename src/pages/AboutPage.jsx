import { useEffect } from "react";

const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='mb-2 mt-2'>
            <div className="max-w-6xl mx-auto px-11 p-6 py-3 mt-3 bg-white shadow-lg rounded-2xl font-lora">
                <h1 className="text-3xl font-bold text-center text-slate-600 mb-4">About Zypaws Home Pet Rescue</h1>
                <p className="text-gray-700 mb-4">
                    Zypaws Home Pet Rescue is a dedicated non-profit organization committed to rescuing,
                    rehabilitating, and rehoming abandoned pets. Our mission is to provide compassionate care,
                    medical treatment, and foster support to ensure every pet finds a safe and loving forever home.
                </p>
                <p className="text-gray-700 mb-4">
                    We work closely with local shelters, veterinary clinics, and caring volunteers to rescue animals in need,
                    offering them a second chance at life. Through adoption services, community outreach, and educational programs,
                    we strive to promote responsible pet ownership and reduce the number of homeless animals.
                </p>
                <p className="text-gray-700 mb-4">
                    At Zypaws, we believe every pet deserves love and care. Our foster network provides temporary homes
                    where animals can recover and socialize before finding their permanent families. We also organize
                    vaccination drives, spay/neuter campaigns, and training sessions to help pets and owners build lasting bonds.
                </p>
                <p className="text-gray-700 mb-4">
                    Our dedicated team of volunteers and animal lovers work tirelessly to provide food, shelter, and medical assistance
                    to pets in distress. Through partnerships with veterinarians and animal behaviorists, we ensure that every rescued pet
                    receives the necessary health checkups, vaccinations, and rehabilitation before being placed in a new home.
                </p>
                <p className="text-gray-700 mb-4">
                    In addition to our rescue efforts, we also focus on educating the community about responsible pet ownership.
                    We conduct workshops and awareness campaigns on topics such as pet nutrition, proper training, and the importance
                    of adopting over buying. Our goal is to create a future where no pet is left behind and every companion animal is
                    given a chance to thrive.
                </p>
                <p className="text-gray-700 mb-4">
                    Whether you're looking to adopt, foster, volunteer, or donate, your support helps us continue our mission
                    of saving lives and creating happy endings for pets in need. Join us in making a difference, one paw at a time.
                </p>

                {/* Our Mission */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Mission</h2>
                    <p className="text-gray-700 mb-2">
                        At <strong>Zypaws Home Pet Rescue</strong>, our mission is to rescue, rehabilitate, and rehome abandoned
                        and neglected pets. We believe that every animal deserves a second chance at life, filled with love,
                        care, and safety.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                        <li>Providing medical care, vaccinations, and necessary treatments for rescued animals.</li>
                        <li>Offering a nurturing environment through our foster network, ensuring each pet is ready for adoption.</li>
                        <li>Educating the community about responsible pet ownership to reduce pet abandonment rates.</li>
                        <li>Partnering with shelters, veterinarians, and volunteers to create a stronger rescue network.</li>
                    </ul>
                    <p className="text-gray-700">
                        Through our dedication and the support of our amazing community, we strive to ensure that every rescued pet
                        finds its <strong>forever home</strong> where they can thrive and be loved unconditionally.
                    </p>
                </section>

                {/* How We Make a Difference */}
                <section className="mb-8 font-lora">
                    <h2 className="text-2xl font-semibold text-green-600 mb-3">How We Make a Difference</h2>
                    <p className="text-gray-700 mb-2">
                        At Zypaws, we go beyond just rescuing pets. We take a holistic approach to animal welfare by actively
                        engaging in programs that make a lasting impact on both animals and the community.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                        <li><strong>Emergency Rescues:</strong> Responding to urgent cases of animal neglect, abuse, and abandonment.</li>
                        <li><strong>Medical Rehabilitation:</strong> Providing surgeries, treatments, and therapies to help pets recover fully.</li>
                        <li><strong>Behavioral Training:</strong> Ensuring that rescued pets receive proper training for a smoother transition into new homes.</li>
                        <li><strong>Foster Care Program:</strong> Connecting rescued animals with temporary caregivers until they find permanent homes.</li>
                        <li><strong>Community Education:</strong> Conducting workshops and events to raise awareness about responsible pet ownership.</li>
                        <li><strong>Spay & Neuter Initiatives:</strong> Reducing pet overpopulation through accessible sterilization services.</li>
                    </ul>
                    <p className="text-gray-700">
                        Every life we save, every family we unite, and every lesson we share contributes to building a more compassionate world
                        for animals. With your help, we can continue making a difference—one paw at a time.
                    </p>
                </section>
            </div>
        </div>

    );
};

export default AboutPage;