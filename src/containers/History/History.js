import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Historty extends Component {

  render() {
    const styles = require('./History.scss');
    return (
      <div className={styles.history + ' container'}>
        <DocumentMeta title="BrasiliaUSA: History"/>
        <div className="header">
          <img src={require('./history-banner.jpg')}/>
          <p className="caption">Brasilia factory in Retorbido, Italy</p>
          <h1 className="title">The Brasilia History</h1>
          <h2>We have been creating the finest espresso machines for 30 years. </h2>
        </div>
        <div className="main-content">
          <ul className="orange-bullet history">
            <li>
              <b>1977</b> -
              The first “BRASILIA” model is launched in the market.
            </li>
            <li>
              <b>1980</b> -
              BRASILIA created Espresso at home: as tasty as in a
              coffee shop, new home-use coffee machines LADY and CLUB have been
              released.
            </li>
            <li>
              <b>1983</b> -
              BRASILIA has produced the first-ever compact coffee machines.
            </li>
            <li>
              <b>1985</b> -
              Once again pioneers in Espresso : MAGIC 85 is the
              first-ever fully automatic model in the market, and BRASILIA
              developed the innovative fully automatic production line.
              <br/>
              BRASILIA launched in the market a brand new coffee machine
              concept with 3 independent boilers: C-85.
            </li>
            <li>
              <b>1995</b> -
              Espresso has become synonymous with artwork - MYTHOS has
              been displayed at the MoMA in New York and BRASILIA
              achieved a nomination for the best design concept award
              by ADI, Italian Association of Design.
            </li>
            <li>
              <b>2000</b> -
              TEX is the first-ever tea brewing machine in the market
            </li>
            <li>
              <b>2001</b> -
              KILO the only industrial brewing system able to brew up
              to 5 litres of Espresso from 1 Kg of roasted coffee
              <br/>
              KILOLYO - BRASILA has created a fore-front standard:
              micro-pressurized coffee drops are frozen to preserve
              flavours and aromas in lyophilized coffee With these
              innovations the Italian Ministry of Industry awarded
              BRASILIA the “Prize for Excellence in Innovation”.
            </li>
            <li>
              <b>2003</b> -
              EXCELSIOR: the futuristic machine, perfect combination
              of aesthetic design and state-of-the art in the Espresso
              technology.
              <br/>
              BULLONE ROSSO: brewing system which guarantees an high-thermal
              stability and a better quality in infusion: 30% more than
              the other competitors.
            </li>
            <li>
              <b>2005</b> -
              The inception of Brasilia USA.
            </li>
            <li>
              <b>2006</b> -
              BRASILIA was selected by Italian Chamber of Industry for
              the “Prize Excellence for the Industrial Innovation”.
              <br/>
              BBA - Brasilia Barista Academy is the first barista academy in Italy.
            </li>
            <li>
              <b>2007</b> -
              New Patent obtained for the Lyophilized Espresso compact production
              using ultrasonic vibrations
              <br/>
              BRASILIA's Coffee Revolution take shape with SUBLIMA, patented
              brewing system which allows a unique extraction and
              pre-infusion : a 14 bar pressure allows baristi to brew a
              best in class Espresso and Cappuccinos, qt a record concentration
              of 10,4°brix on a standard Espresso dose.
              <br/>
              SEQUENTIAL STEAM SHIFT: pat-pending.
            </li>
            <li>
              <b>2007-2008</b> -
              Development of pod and capsule machines line
              2007 for OCS and Household.
              <br />
              2008 BRASILIA started the development and the
              production at its manufacturing plants in China of
              the machines using monodosis coffee (brewing
              group patented system).
              <br />
              <b>MAKI</b> (pod or capsule) for home and small office
              use.
              <br />
              <b>Gourmet</b> (pod or capsule) for OCS.
            </li>
            <li>
              <b>2009</b> -
              Even if the group strategy for this year is the
              consolidation, Brasilia and Rossi added to their
              2009
              products    portfolio   few  new    models    of
              professional, domestic coffee and cappuccino
              machines and grinders according to the market
              evaluation needs.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
