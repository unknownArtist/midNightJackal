/**
 * InterestingTopic
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'topic_likes',
  attributes: {
	topic_id: 'string',
	user_id: 'string',
 }
};

