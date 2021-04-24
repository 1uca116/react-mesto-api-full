const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsers, getUser, updateUser, updateAvatar, getMe} = require('../controllers/users');

router.get('/', getUsers)

router.get('/me', getMe)

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUser)


router.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
}), updateUser)

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/),
  }),
}), updateAvatar)

module.exports = router;
