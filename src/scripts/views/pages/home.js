/* eslint-disable max-len */
import RestaurantSource from '../../data/restaurantdb-source';
import {createRestaurantItem} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="hero">
        <div class="hero__inner">
          <div class="hero__title">
            <h1>Rasakan Kelezatan di Setiap Porsi Makanan Kami</>
            <p class="hero__tagline">Datanglah ke restoran kami dan rasakan pengalaman makan yang tak terlupakan. Dari ujung jari hingga lidah, hidangan yang tercipta dengan sempurna oleh para ahli kami akan memanjakan indera pengecap Anda.</p>
          </div>
        </div>
      </div>
      <div class="content" id="content">
      <h2 class="text-main">Explore Restaurant</h1>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.home();
    const restaurantsContainer = document.querySelector('#restaurants');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItem(restaurant);
    });
  },
};


export default Home;
