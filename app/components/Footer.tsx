const Footer = () => {
  return (
    <footer className="bg-[#4a2060] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Dr. Vrushali Saraswat | Happiness Holistic Clinic. All rights reserved.
        </p>
        <p className="text-sm opacity-60 mt-2">
          Contact: heal@drvrushali.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;