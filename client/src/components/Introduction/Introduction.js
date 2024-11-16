import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleDownloadCsv } from '../../api';
import './Introduction.css';

function Introduction() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDownloadClick = async () => {
    try {
      const blob = await handleDownloadCsv(); // Call the function from api.js
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'answers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="introduction">
      <div className="introduction-text">
        <p>¡you_are_going_to_be_tested!</p>
        <ul>
          <li><strong>purpose,<br /></strong> we’re_exploring_if_certain_text_formats (camelCase vs. kebab-case) affect_reading_speed_for_code</li>
          <li><strong>task,<br /></strong> you’ll_see_a_simple_phrase (e.g., “move south”) and_then_pick_the_matching_identifier_from_a_list_using_either camelCase or kebab-case</li>
          <li><strong>instructions, </strong>select_the_correct_identifier_as_quickly_and_accurately_as_possible</li>
          <li><strong>data_collection, </strong>we’ll_record_the_time_you_take_and_whether_you_choose_correctly_to_analyze_overall_reading_speed</li>
        </ul>
      </div>
      <div className="introduction-buttons">
        <button className="button signup" onClick={handleSignUpClick}>sign_up</button>
        <button className="button login" onClick={handleLoginClick}>login</button>
        <button className="button download" onClick={handleDownloadClick}>Download .csv</button>
      </div>
    </div>
  );
}

export default Introduction;
