/**
 * ForumTopics.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,
	tableName: 'gupshup_topic_replies',
	attributes: {

    gs_topic_id: 'string',
	user_id: 'string',
    body: 'text',
    // agree: 'int',
    // partial_agree: 'int',
    // dont_agree: 'int'

	
	}

};
