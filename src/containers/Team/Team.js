import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Team extends Component {

  render() {
    return (
      <div className="container">
        <DocumentMeta title="BrasiliaUSA: Team"/>
        <div className="header">
          <img src={require('./team-banner.jpg')}/>
          <p className="caption">Philadelphia, our home</p>
          <h1 className="title">Our Team of Companies</h1>
        </div>
        <div className="main-content">
          <h2>Pioneers</h2>
          <ul>
            <li>
              <p><img src={require('./rossi_group.jpg')}/><b>Gruppo Rossi</b> - is an established and reliable
                business group, with a professionalism that guarantees top
                quality standards from bean to cup.
              </p>
              <p>
                Thanks to an intense partnership with Gruppo Rossi,
                BRASILIA acquired a specific know-how coming from the Rossi
                experience, market-leading manufacturer in grinders, capsule
                production units and pod production units.
              </p>
            </li>
            <li>
              <p><b>Bratos</b>- coffee-roasting machines manufacturer</p>
            </li>
            <li>
              <p><b>Italfiltri</b>- filter-holder producer.</p>
            </li>
          </ul>
          <p>
            Brasilia USA was established in 2005 to fortify our existence in the market,
            and strengthen support to our U.S. customer base.  The tradition, quality, and
            innovation, embodied by the entire Rossi Group are now directly present in
            North American through our U.S. office.  With our new foundation in place in the
            Philadelphia area, we look forward to continuous growth by providing the highest
            levels of customer service and support, as well as aggressively promoting the
            development of the specialty coffee industry in the United States.  Whatever your needs,
            we are ready to serve you!
          </p>
        </div>
      </div>
    );
  }
}
