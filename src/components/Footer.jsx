const Footer = () => {
  return (
    <footer className="py-8 bg-neutral-950 border-t border-purple-900/20 text-center">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-500">Usupek</span>. Built with React &
        Tailwind.
      </p>
    </footer>
  );
};

export default Footer;
