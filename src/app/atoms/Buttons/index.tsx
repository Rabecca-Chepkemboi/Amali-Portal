import Link from 'next/link';
import React from 'react';

const Buttons = () => {
  return (
    <div>
      <Link href="/donation">
        <button className="bg-red-700 text-white py-2 px-8 rounded-full cursor-pointer font-merriweather">
          DONATE
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
