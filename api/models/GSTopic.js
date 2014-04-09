module.exports = {

  tableName: 'gupshup_topic',

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    user_id: 'string',
    slug: {
        type: 'string',
        required: true,
        unique: true,
        regex: '^[a-z-]+'
    },
    body: {
      type: 'string',
      required: true
    },
    edited: 'boolean',
    delete_requests: 'int',
  }
};
