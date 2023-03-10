/* eslint-disable max-len */
import CONFIG from '../../globals/config';


const createRestaurantItem = (restaurant) =>{
  return (`
  <div class="card">
    <div class="card-header">
      <span class="kota">${restaurant.city}</span>
      <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" alt="${restaurant.name}">
    </div>
    <div class="card-body">
      <span class="tag tag-purple">${restaurant.rating}</span>
      <h2 class="title_card"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h2>
      <p class="desc_card">${restaurant.description}</p>
    </div>
  </div>
`);
};

const createRestaurantDetailTemplate = (restaurant) => {
  const drinks = restaurant.menus.drinks.map((minuman) => {
    return (`<li>${minuman.name}</li>`);
  });
  const foods = restaurant.menus.foods.map((makanan) => {
    return (`<li>${makanan.name}</li>`);
  });
  const ratings = (rating) =>{
    if (parseInt(rating) >= 4) {
      if (parseInt(rating) == 5) {
        return (`<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`);
      } else if (parseInt(rating) == 4 && Math.round(rating) > 4) {
        return (`<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>`);
      } else {
        return (`<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`);
      }
    } else if (parseInt(rating) < 4 && parseInt(rating) >= 3) {
      return (`<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half"></i>`);
    } else {
      return ('far fa-star-half');
    }
  };

  const reviews = restaurant.customerReviews.map((review) => {
    return (`
    <li><h3>${review.name}</h3></li>
    <li><span>${review.date}<span></li>
    <li><p>${review.review}</p></li>
    `);
  });

  return (
    `
    <div class="restaurant-header">
      <div class="restaurant-header__image">
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" alt="${restaurant.name}">
      </div>
      <div class="restaurant-header__information" id="restaurant-header__information" tabindex="0">
        <h1 class="name_restaurant">${restaurant.name}</h1>
        <p>${restaurant.address}</p>
        <p>${restaurant.city}</p>
        <p class="rating">${ratings(restaurant.rating)} <span class="">${restaurant.rating} / 5</span></p>
      </div>
    </div>
    <div class="restaurant-detail">
      <h1 class="title">Overview</h1>
      <p>${restaurant.description}</p>
      <h1 class="title">Menu</h1>
      <div class="menu">
        <ul class="foods">
          <li class="title"><h3>Makanan</h3></li>
          ${foods.join('')}
        </ul>
        <ul class="drinks">
          <li class="title"><h3>Minuman</h3></li>
          ${drinks.join('')}
        </ul>
      </div>
      <h1 class="title">Reviews</h1>
      <ul class="reviews">${reviews.join('')}</ul>
    </div>
    `
  );
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;
const createUnikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

const spinnerLoader = {
  show() {
    return `<span class="loader"></span>`;
  },
  remove() {
    document.querySelector('.loader').remove();
  },
};

export {
  createRestaurantItem,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnikeRestaurantButtonTemplate,
  spinnerLoader,
};

