import { Footer } from "antd/lib/layout/layout";
import React from "react";

function FooterComponent() {
    return <div>
        <Footer>
            <div className="d-flex align-items-center sm-flex-direction-column">
                <div className="flex-fill">
                    <p className="mb-0 text-center">Copyright © 2022. Travancore Analytics Pvt Ltd. All rights reserved.</p>
                </div>
                {/* <div className="flex-auto">
          <div className="container custom-container">
            <p className="mb-0">Email: contactus@atmls.com</p>
          </div>
        </div> */}
            </div>
        </Footer>
    </div>;
}

export default FooterComponent;
