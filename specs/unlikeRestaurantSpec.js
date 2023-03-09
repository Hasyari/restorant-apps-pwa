import FavoritesRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking a Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<div id="likeButtonContainer"></div>`;
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    FavoritesRestaurantIdb.putRestaurant({id: 1});
  });

  afterEach(async () => {
    FavoritesRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike button when restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like button when restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able remove restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritesRestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    await FavoritesRestaurantIdb.deleteRestaurant(1);
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoritesRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
