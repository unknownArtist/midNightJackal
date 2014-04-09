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

    gs_topic_id:  {
		type: 'string',
		required: true
	},
	user_id: {
		type: 'string',
		required: true
	},
    body:{
		type: 'text',
		required: true
    },
    // agree: 'int',
    // partial_agree: 'int',
    // dont_agree: 'int'

	
	}

};
