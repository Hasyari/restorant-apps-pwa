const assert = require('assert');
Feature('Liking Restaurants');

Before(({I}) => {
  I.amOnPage('/#/favorites');
});

Scenario('liking one movie', async ({I}) => {
  I.seeElement('#restaurants');
  I.see('Tidak ada resto untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.title_card a');
  const firstRestaurant = locate('.title_card a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurantTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.card');

  const likedRestaurantTitle = await I.grabTextFrom('.title_card');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one movie', async ({I}) => {
  I.amOnPage('/');

  I.seeElement('.title_card a');
  I.click(locate('.title_card a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');

  I.seeElement('.title_card a');
  const firstRestaurant = locate('.title_card a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurantTitle);

  I.seeElement('.name_restaurant');
  const likedRestaurantTitle = await I.grabTextFrom('.name_restaurant');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  I.amOnPage('/#/favorites');

  I.seeElement('#restaurants');
  I.see('Tidak ada resto untuk ditampilkan', '.restaurant-item__not__found');
});
