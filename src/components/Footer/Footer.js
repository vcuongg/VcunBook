import React from "react";
import "./Footer.css";
const footer = () => {
  return (
    <div className="footer py-4">
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 ">
            <h4 class="text-light">VcunBook </h4>
            <p class="link-color">
              VcunBook is an online book selling website, helping you search and
              buy books easily and quickly.
            </p>
          </div>
          <div className="col">
            <h5 class="text-light">Quick links</h5>
            <ul class="list-unstyled">
              <li>
                <a class="text-decoration-none link-color" href="">
                  Home
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  Books
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  Orders
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5 class="text-light">Support</h5>
            <ul class="list-unstyled">
              <li>
                <a class="text-decoration-none link-color" href="">
                  Help Center
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  Contact us
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  Privacy policy
                </a>
              </li>
              <li>
                <a class="text-decoration-none link-color" href="">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
          <div className="col col col-lg-3">
            <h5 class="text-light">Media Socials</h5>
            <p class="link-color">Subscribe for updates and special offers</p>
            <div>
              <a href="#">
                <i class="bi bi-instagram fs-3 me-3 link-color"></i>
                <i class="bi bi-facebook fs-3 me-3 link-color"></i>
                <i class="bi bi-twitter fs-3 me-3 link-color"></i>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <p class="text-light">© 2025 VcunBook. All rights reserved.</p>
          </div>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
      ></link>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
        crossorigin="anonymous"
      ></link>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
        crossorigin="anonymous"
      ></script>
    </div>
  );
};

export default footer;
