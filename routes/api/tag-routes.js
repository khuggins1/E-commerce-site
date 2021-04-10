const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { associations } = require('../../models/Tag');
const { col } = require('sequelize/types');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      through: {
        attributes: ['product_id', 'tag_id'],
      }
    }]
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      through: {
        attributes: ['product_id', 'tag_id'],
    },
  }]
})
.then(dbData => res.json(dbData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if(!dbData[0]) {
    res.status(404).json({ message: "No Tag found with this id"});
    return;
  }
  res.json({ message: 'Tag updated'});
  })
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    console.log(dbData)
    if (!dbData) {
      res.status(404).json({ message: 'No Tag found with this id '});
      return;
    }
    res.json({ message: 'Tag deleted '});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
