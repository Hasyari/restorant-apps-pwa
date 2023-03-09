import FavoritesRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking a Restaurant', () => {
  const addButtonLikeContainer = () => {
    document.body.innerHTML = `<div id="likeButtonContainer"></div>`;
  };

  beforeEach(() => {
    addButtonLikeContainer();
  });

  it('should show the like button when the restaurant has not been like before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been like before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like to restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoritesRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({id: 1});
    FavoritesRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});

    await FavoritesRestaurantIdb.putRestaurant({id: 1});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritesRestaurantIdb.getAllRestaurant()).toEqual([{id: 1}]);
    FavoritesRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant if it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoritesRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
