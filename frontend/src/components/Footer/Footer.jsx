import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: "About",
      links: ["About Us", "Features", "News", "Menu"],
    },
    {
      title: "Company",
      links: ["Why FoodieApp?", "Partner with Us", "FAQ", "Blog"],
    },
    {
      title: "Support",
      links: ["Account", "Support Center", "Feedback", "Contact Us"],
    },
  ];

  return (
    /* Background is pure white to match design */
    <footer className="bg-white pt-16 pb-8 border-t border-[#f5f1f0] w-full mt-auto">
      {/* Container aligned with Hero left margin */}
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Socials Column */}
          <div className="flex flex-col gap-5 text-left">
            <a className="flex items-center gap-2" href="#">
              <div className="size-8 text-[#f45925] bg-[#f45925]/10 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#181311]">FoodieApp</span>
            </a>
            <p className="text-sm text-[#8a6b60] leading-relaxed max-w-70">
              Our job is to filling your tummy with delicious food and with fast and free delivery.
            </p>
            {/* Social Icons with subtle background */}
            <div className="flex gap-3">
              {['IG', 'FB', 'TW'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="size-9 rounded-full bg-[#f5f1f0] flex items-center justify-center text-[#181311] hover:bg-[#f45925] hover:text-white transition-all text-[10px] font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-6 text-left">
              <h4 className="font-bold text-[#181311] text-lg">{section.title}</h4>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <a 
                    key={link} 
                    href="#" 
                    className={`text-sm transition-colors ${
                      link === "Partner with Us" ? "text-[#f45925]" : "text-[#8a6b60] hover:text-[#f45925]"
                    }`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright Section with standard divider */}
        <div className="text-center pt-8 border-t border-[#f5f1f0] mt-12">
          <p className="text-sm text-[#8a6b60] opacity-80">
            © 2024 FoodieApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;