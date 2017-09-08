exports.up = (pgm) => {
  pgm.addColumns( 'users', { reporter: { type: 'bool' }, editor: { type: 'bool' } } )
};

exports.down = (pgm) => {
  pgm.dropColumns('users', ['reporter', 'editor'])
};
