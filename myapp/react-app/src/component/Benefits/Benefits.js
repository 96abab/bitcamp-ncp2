import React ,{useState} from 'react';
import './css/Benefits.css';
import { Modal, Button, Overlay } from "react-bootstrap";
import Peak from '../Festival/Peak';
import Dron from '../Festival/Dron';
import Nightmarket from '../Festival/Nightmarket';
import Firework from '../Festival/Firework';
import { Link } from 'react-router-dom';

function Benefits() {


  return (
    <div>
      <section class="benefits">
        <h2>이달의 축제</h2>
        <p>
          HANGANG을 통해 다양한 기관에서 계최하는 축제를 경험할 수 있습니다.
          대표적인 축제로는 다음과 같은 것들이 있습니다.
        </p>
        <ul>
          <section class="festival">
            <div class="festival-list">
              <div class="festival-item">
              <Link className="peak-img" to="/Peak" />
                <div class="peak-content">
                  ABOUT <br />
                  cherry blossoms festival. <br />
                  show more
                </div>
                <div class="dron-content">
                  ABOUT <br />
                  Fireworks festival. <br />
                  show more
                </div>
                <Link className="dron-img" to="/Dron" />
                <Link className="night-img" to="/Nightmarket" />
                <div class="night-content">
                  ABOUT <br />
                  Bamdokkaebi Night Market. <br />
                  show more
                </div>
                <div class="fire-content">
                  ABOUT <br />
                  marathon. <br />
                  show more
                </div>
                <Link className="fire-img" to="/Firework" />
              </div>
            </div>
          </section>
        </ul>
      </section>
    </div>
  )
}

export default Benefits;