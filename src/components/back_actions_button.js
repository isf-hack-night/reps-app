import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import queryAPI from '../query_api'
//import { Button } from 'react-bootstrap'
//import { Button} from 'semantic-ui-react'
import FlatButton from 'material-ui/FlatButton';



class JustBTAButton extends Component {
  constructor (props) {
    super(props)

    this.goToActionsList = this.goToActionsList.bind(this)
  }

  goToActionsList () {
    const { districtLower, districtUpper } = queryAPI.parse()
    const newRoute = queryAPI.build({
      districtLower,
      districtUpper,
    })
    this.props.history.push(newRoute)
  }

  render () {

    return (
     /* <Button className="BTAButton" onClick={this.goToActionsList} >
          &lt;&lt; Back To Actions List
      </Button> */
      <FlatButton className="BTAButton" onClick={this.goToActionsList} label="&lt;&lt; Back To Actions List" />

    )
  }
}

const BackToActionsButton = withRouter(({history, action}) => (
  <JustBTAButton history={history} action={action} />
))

export default BackToActionsButton
