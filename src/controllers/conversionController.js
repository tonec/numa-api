import errors from 'restify-errors'
import { isNum } from '../utils'
import { toLatin, fromLatin } from '../utils/convertNumerals'

export default {
  toLatin: (req, res) => {
    const { params } = req

    if (!params.val) {
      return res.send(
        new errors.BadRequestError('No value to convert.')
      )
    }

    if (!isNum(params.val)) {
      return res.send(
        new errors.BadRequestError('The value provided is not a number.')
      )
    }

    res.json({
      type: params.type,
      originalValue: params.val,
      conversionValue: toLatin(params.val)
    })
  },

  fromLatin: (req, res) => {
    const { params } = req

    if (!params.val) {
      return res.send(
        new errors.BadRequestError('No value to convert.')
      )
    }

    const converted = fromLatin(params.val)

    if (!converted) {
      return res.send(
        new errors.BadRequestError('The value provided is not a roman numeral.')
      )
    }

    res.json({
      type: params.type,
      originalValue: params.val,
      conversionValue: converted.toString()
    })
  }
}
