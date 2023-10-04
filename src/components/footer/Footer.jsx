import React from 'react'
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">Pragadeesh</h1>

            <ul className="footer__list">
                <li>
                    <a href="#about" className="footer__link">About</a>
                </li>

                <li>
                    <a href="#portfolio" className="footer__link">Projects</a>
                </li>

                <li>
                    <a href="#skills" className="footer__link">Skills</a>
                </li>
            </ul>

            <div className="footer__social">
            <a href="https://www.instagram.com/wpragdeesh/" className="home__social-icon" target='_blank'>
        <i class="uil uil-instagram-alt"></i>
        </a>
        <a href="https://www.linkedin.com/in/pragadeeshwaran-k-j-440908268/" className="home__social-icon" target='_blank'>
        <i class="uil uil-linkedin"></i>
        </a>
        <a href="https://discord.com/users/755092821911929092" className="home__social-icon" target='_blank'>
        <i class="uil uil-discord"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCSyMhE-Z1d4DRRiQj4ZhWzQ" className="home__social-icon" target='_blank'>
        <i class="uil uil-youtube"></i>
        </a>
        <a href="https://github.com/Prag-deesh" className="home__social-icon" target='_blank'>
        <i class="uil uil-github"></i>
        </a>
            </div>

            <span className="footer__copy">&#169; Pragadeesh. All rights reserved</span>
        </div>
    </footer>
  )
}

export default Footer