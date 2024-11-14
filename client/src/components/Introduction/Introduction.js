// src/components/Introduction/Introduction.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';

function Introduction() {
    const navigate = useNavigate();
  
    const handleSignUpClick = () => {
      navigate('/signup');
    };
  
    const handleLoginClick = () => {
      navigate('/login');
    };
  
    return (
      <div className="introduction">
        <div className="introduction-text">
          <p>¡you_are_going_to_be_tested!</p>
          <ul>
            <li><strong>purpose,<br /></strong> we’re_exploring_if_certain_text_formats (camelCase vs. kebab-case) affect_reading_speed_for_code.</li>
            <li><strong>task,<br /></strong> you’ll_see_a_simple_phrase (e.g., “move_south”) and_then_pick_the_matching_identifier_from_a_list_using_either camelCase or kebab-case.</li>
            <li><strong>instructions, </strong>select_the_correct_identifier_as_quickly_and_accurately_as_possible.</li>
            <li><strong>data_collection, </strong>we’ll_record_the_time_you_take_and_whether_you_choose_correctly_to_analyze_overall_reading_speed.</li>
          </ul>
        </div>
        <div className="introduction-buttons">
          <button className="button signup" onClick={handleSignUpClick}>sign_up</button>
          <button className="button login" onClick={handleLoginClick}>login</button>
        </div>
      </div>
    );
  }
  
  export default Introduction;
