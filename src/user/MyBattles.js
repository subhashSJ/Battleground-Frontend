import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../core/helper/Catetgorycall';
import { getIsCompleted } from '../core/helper/Profile';


const MyBattles = () => {

  const [category, setCategory] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setCategory(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);



  useEffect(() => {
    getIsCompleted("628bbb4fad7e35153d30c548", "627e3b3ba69b15a66e263260")
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setCompleted(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(completed);




  return (

    <div className='card battle_card'>

      <div className='card custom-card margin_down'>
        <div className='row g-0'>
          <div className='col-md-4 card card_logo'>
            <img
              src='https://raw.githubusercontent.com/smohsin4/images/main/CSS%20logo.png'
              className="img-fluid rounded-start card-img-top "
              alt="..."
            />
          </div>
          <div className='col-md-8 padding_card'>
            <div className='card-body'>
              <h3 className='card-title margin_down'>Performance</h3>
              <h5 className='card-text margin_down'> Switch Category </h5>
              <div>
                <select>
                  <option> My Battles</option>
                  {category.map((category, index) => (
                    <option key={index} value={category._id}>{category.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card target_card'>
        <table>
          <thead>
            <tr>
              <th>Target</th>
              <th>completed</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>done</td>
              <td>585</td>
            </tr>

            <tr>
              <td>2</td>
              <td>done</td>
              <td>400</td>
            </tr>

            <tr>
              <td>3</td>
              <td>done</td>
              <td>300</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBattles
