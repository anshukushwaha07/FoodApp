const Footer = () => {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-3">FoodieApp</h3>
          <p className="text-gray-500 text-sm">
            Filling your tummy with delicious food and fast delivery.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3">Company</h4>
          <p className="text-sm text-gray-500">About</p>
          <p className="text-sm text-gray-500">Blog</p>
        </div>

        <div>
          <h4 className="font-bold mb-3">Support</h4>
          <p className="text-sm text-gray-500">Help Center</p>
          <p className="text-sm text-gray-500">Contact</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-10">
        © 2024 FoodieApp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
