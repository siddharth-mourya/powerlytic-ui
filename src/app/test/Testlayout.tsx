import React from "react";

const TestLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="columns-3 gap-4 p-4">
      <img
        className="aspect-[3/2] w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/400x300/ccc/000&text=Image+1"
        alt="Image 1"
      />
      <img
        className="aspect-square w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/300x300/aaa/fff&text=Image+2"
        alt="Image 2"
      />
      <img
        className="aspect-square w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/300x300/bbb/000&text=Image+3"
        alt="Image 3"
      />
      <img
        className="aspect-[3/2] w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/400x300/888/fff&text=Image+4"
        alt="Image 4"
      />
      <img
        className="aspect-square w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/300x300/666/fff&text=Image+5"
        alt="Image 5"
      />
      <img
        className="aspect-square w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/300x300/666/fff&text=Image+6"
        alt="Image 6"
      />
      <img
        className="aspect-square w-full object-cover rounded-lg mb-4"
        src="https://dummyimage.com/300x300/666/fff&text=Image+7"
        alt="Image 7"
      />
    </div>
  );
};

export default TestLayout;
