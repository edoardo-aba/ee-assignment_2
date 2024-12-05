import pandas as pd

# Load the CSV files
users_file_path = '../Data/Collections/register.users.csv'
answers_file_path = '../Data/Collections/register.answers.csv'

# Load the users data
users_df = pd.read_csv(users_file_path)

# Demographic Summary Calculations
age_ranges = ['18-30', '31-45', '46-60', '60+']
age_distribution = users_df['age'].value_counts(normalize=True).reindex(age_ranges, fill_value=0) * 100

programming_experience = users_df['programmingExperience'].value_counts(normalize=True) * 100
language_proficiency = users_df['language'].value_counts(normalize=True) * 100

# Create a summary dataframe for better display
summary = {
    'Age Distribution (%)': age_distribution.round(2),
    'Programming Experience (%)': programming_experience.reindex(['yes', 'no'], fill_value=0).round(2),
    'Language Proficiency (%)': language_proficiency.reindex(['yes', 'no'], fill_value=0).round(2)
}

demographic_summary_df = pd.DataFrame(summary)

# Display the summary
print(demographic_summary_df)
