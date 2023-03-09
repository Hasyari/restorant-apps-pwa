import FavoritesRestaurantIdb from '../../data/favorite-restaurant-idb';
import {createRestaurantItem} from '../templates/template-creator';

const Favorites = {
  async render() {
    return `
    <div class="content">
      <h2 class="text-main">Favorites Restaurant</h1>
      <div id="sub-content" class="sub-content">
        <div id="restaurants" class="restaurants"></div>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoritesRestaurantIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');
    if (restaurants.length> 0) {
      restaurants.forEach((restaurant) =>{
        restaurantContainer.innerHTML += createRestaurantItem(restaurant);
      });
    } else {
      document.querySelector('#sub-content').innerHTML += '<p class="restaurant-item__not__found">Tidak ada resto untuk ditampilkan</p>';
    }
  },
};


export default Favorites;
