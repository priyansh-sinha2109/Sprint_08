import React from "react";

const Footer = () => {
  return (
    <div className="text-[rgb(115,115,115)] md:px-10">
      <div className="py-20">
        <p>Developed by Priyansh Sinha ❤️</p>
        <p>
          Read About Mirrorflix TV Shows and movies and watch bonus videos on
          About page of Mirrorflix.
        </p>
      </div>
      <p className="pb-5">Questions? Contact us.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 items-center">
        <ul className="flex flex-col space-y-2">
          <li>FAQ</li>
          <li>Investor Relations</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Cookies Preferences</li>
          <li>Legal Notice</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Account</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
          <li>Only on Mirrorflix</li>
        </ul>
        <ul className="flex flex-col space-y-2">
          <li>Media Center</li>
          <li>Terms of use</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
