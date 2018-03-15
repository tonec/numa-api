import conversionController from '../controllers/conversionController'
import config from '../../config'

const path = config.basePath

export default app => {
  app.get(path('/convert/toLatin'), conversionController.toLatin)
  app.get(path('/convert/fromLatin'), conversionController.fromLatin)
}
