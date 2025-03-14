import React from "react";
import image1 from './images/summer.jpg'
import image2 from './images/sneakers.jpg'
import image3 from './images/denim-jacket.jpg'
import image4 from './images/gown.jpg'
import image5 from './images/whiteT.jpg'
import image6 from './images/handbag.jpg'
import image7 from './images/casualTrouser.jpg'
import image8 from './images/glasses.jpg'

const Card = () => {
  // Array of fashion items
  const fashionCollection = [
    {
      image: image1,
      title: "Stylish Summer Dress",
      description: "A perfect dress for summer outings.",
    },
    {
      image: image2,
      title: "Trendy Sneakers",
      description: "Stay comfortable and stylish with these sneakers.",
    },
    {
      image: image3,
      title: "Casual Denim Jacket",
      description: "A versatile jacket for all occasions.",
    },
    {
      image: image4,
      title: "Elegant Evening Gown",
      description: "Make a statement with this stunning gown.",
    },
    {
      image: image5,
      title: "Classic White Shirt",
      description: "A wardrobe staple that never goes out of style.",
    },
    {
      image: image6,
      title: "Chic Handbag",
      description: "Add a touch of elegance to your outfit.",
    },
    {
      image: image7,
      title: "Smart Casual Trousers",
      description: "Perfect for a smart casual look.",
    },
    {
      image: image8,
      title: "Fashionable Sunglasses",
      description: "Protect your eyes in style.",
    },
  ];

  return (
    <>
      <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {fashionCollection.map((item, index) => (
              <SingleCard
                key={index}
                image={item.image}
                CardTitle={item.title}
                CardDescription={item.description}
                Button="View Details"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <div className="p-1 flex flex-col">
      <div className="mb-10 flex flex-col justify-between overflow-hidden rounded-lg p-4 bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt={CardTitle} className="w-full h-24 object-cover" />
        <div className="p-4 text-center sm:p-6 md:p-4 xl:p-6 flex-grow">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-2 block text-lg font-semibold text-dark hover:text-primary dark:text-white sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-xl"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-300 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
