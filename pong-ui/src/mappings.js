import DeveloperServices from './assets/img/icon/developer_services.svg';
import DeveloperTools from './assets/img/icon/developer_tools.svg'
import MediaServices from './assets/img/icon/media_services.svg'
import MarketingTools from './assets/img/icon/marketing_tools.svg'
import SmartContract from './assets/img/icon/smart_contract.svg'

const colorMapping = {
  smartContract: 'primary',
  marketing: 'success',
  development: 'yellow',
  media: 'purple',
  tools: 'danger',
}

const iconMapping = {
  smartContract: SmartContract,
  marketing: MarketingTools,
  development: DeveloperServices,
  media: MediaServices,
  tools: DeveloperTools,
}

export {
  colorMapping,
  iconMapping,
};