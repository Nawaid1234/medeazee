import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-200 p-4 h-full">
      <nav>
        <ul className="space-y-4">
          <li><Link to="/" className="block">Home</Link></li>
          <li><Link to="/about" className="block">About</Link></li>
          <li><Link to="/contact" className="block">Contact</Link></li>
          <li><Link to="/services" className="block">Services</Link></li>
          <li><Link to="/chat" className="block text-blue-500">AI Chat</Link></li>
        </ul>
      </nav>
    </div>
  );
}
