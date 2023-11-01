import Link from 'next/link';
import React from 'react';

const Button = () => {
  return (
    <div>
      <Link href="/donation">
        <button className="bg-green-700 text-white py-2 px-8 rounded-full cursor-pointer font-merriweather">
          DONATE
        </button>
      </Link>
    </div>
  );
}

export default Button;
