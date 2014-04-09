module.exports = {

	index: function(req, res) {
		res.send("hey");
	
	},
	replyToTopic: function(req, res){

	GSTopicsReplies.create({
		user_id: String(req.session.user_id),
		gs_topic_id: req.param("topicId"),
		body: req.param("body")
    }, function(err, reply) {
      if (err) {
        res.json({ status: 404, error: err });
      }else {
        res.json({
          status: 200,
          message: "reply submitted",
          reply: reply
        });
      }
    });
	},

	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TopicReplyController)
   */
  _config: {}

  
};
