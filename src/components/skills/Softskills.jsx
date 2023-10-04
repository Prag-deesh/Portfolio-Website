import React from 'react'

const Softskills = () => {
  return (
    <div className="skills__content">
    <h3 className="skills__title"> Soft Skills </h3>
    <div className="skills_box">
        <div className="skills_group">
            <div className="skills__data">
                <i class='bx bx-badge-check' ></i>

                <div>
                    <h3 className="skills__name">Tableau</h3>
                    <span className="skills__level"></span>
                </div>
            </div>

            <div className="skills__data">
                <i class='bx bx-badge-check' ></i>

                <div>
                    <h3 className="skills__name">Machine Learning</h3>
                    <span className="skills__level"></span>
                </div>
            </div>

            <div className="skills__data">
                <i class='bx bx-badge-check' ></i>

                <div>
                    <h3 className="skills__name">Social Media Marketing</h3>
                    <span className="skills__level"></span>
                </div>
            </div>
        </div>

    </div>
</div>
  )
}

export default Softskills