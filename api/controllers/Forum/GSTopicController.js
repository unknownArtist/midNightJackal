module.exports = {

  index: function(req, res) {
    GSTopic.find().exec(function(err, topics){
       res.view("gstopic/topics",{topics: topics });
    });
  },
  showTopic: function(req, res){
    var replies = null;
    GSTopic.find()
           .where({id: req.param('id')})
           .exec(function(err, topic){
              GSTopicsReplies.find()
                   .where({gs_topic_id: topic[0].id})
                   .exec(function(err, replies){
                      res.view("gstopic/show_topic",{topic: topic,replies: replies });
                   });


                
            });
  },
  createTopic: function(req, res){
    return res.view('gstopic/create_topic');
  },
  storeTopic: function(req, res) {
     GSTopic.create({
      title: req.param("title"),
      user_id: req.session.user_id,
      slug: strToSlug(req.param("title")),
      body: req.param("body")
    }, function(err, topic) {
      if (err) {
        res.json({ status: 404, error: err });
      } else {
        res.json({status: 200,message: "Topic Created"});
      }
    });
  },

  updateTopic: function(req, res){
    GSTopic.findOne(req.param('topic_id')).done(function(err, topic) {
    // we now have a model with instance methods attached
    // update an attribute value
    topic.title = req.param('title');
    topic.body =  req.param('body');
    topic.edited = true;

    // save the updated value
    topic.save(function(err) {
      if(err){
        res.json({ status:401,message:"Topic could'nt updated" });
      }else{
        res.json({ status:200,message:"Topic updated" });
      }
      });
    });
  },

  likeTopic: function(req, res){
    InterestingTopic.find()
                    .where({user_id: req.param('user_id') })
                    .where({topic_id: req.param('topic_id')})
                    .exec(function(err, topicInterest){
                      if(topicInterest.length !== 0){
                        res.json({status: 201, message: "You already liked this topic" });
                      }else{
                        InterestingTopic.create({
                        topic_id : req.param('topic_id'),
                        user_id  : req.param('user_id')
                      },function(err, topicRequest){
                          if(err){
                            res.json({status: 401, message: err});
                          }else{
                            res.json({ status: 200 });
                          }
                        });
                      }
                    });
  },

  deleteRequest: function(req, res){
    DeleteTopicRequest.find()
                      .where({user_id: req.param('user_id') })
                      .where({topic_id: req.param('topic_id')})
                      .exec(function(err, reqTopic){
                        if(reqTopic.length !== 0){
                          res.json({status: 201, message: "You already requested for this topic to delete"});
                        }else{

                          DeleteTopicRequest.create({
                            topic_id : req.param('topic_id'),
                            user_id  : req.param('user_id')
                          },function(err, topicRequest){
                              if(err){
                                res.json({status: 401, message: err});
                              }else{
                                res.json({status: 200, message: "Your request submitted successfully" });
                              }
                          });
                        }
                      });

  },



};

  var strToSlug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };








