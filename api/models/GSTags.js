module.exports = {
  
  schema: true,
  tableName: 'gupshup_tags',
  
  attributes: {
    tag_name: 'string',
    post_id: {
    type: 'integer',
    required: true
    }
  }
};




