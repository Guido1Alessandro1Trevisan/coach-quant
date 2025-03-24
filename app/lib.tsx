
'use server';

import { getXataClient } from '@/src/xata';
import { Resend } from 'resend';

export async function updateUserVote(
  userId: string,
  question: string,
  newVote: 'thumbsUp' | 'thumbsDown' | null
) {
  const xata = getXataClient(); // Initialize Xata client
  try {
    const existingRecord = await xata.db['questions-completed']
      .filter({
        userid: userId,
        userquestion: question,
      })
      .getFirst();

    if (existingRecord) {
      // Update existing record
      await xata.db['questions-completed'].update(existingRecord.id, {
        upvote: newVote === 'thumbsUp',
        downvote: newVote === 'thumbsDown',
      });
    } else {
      // Create new record
      await xata.db['questions-completed'].create({
        userid: userId,
        userquestion: question,
        completed: false,
        upvote: newVote === 'thumbsUp',
        downvote: newVote === 'thumbsDown',
      });
    }
  } catch (error) {
    console.error('Error updating vote:', error);
    throw error;
  }
}

export async function updateUserCompletion(
  userId: string,
  question: string,
  newCompleted: boolean
) {
  const xata = getXataClient(); // Initialize Xata client
  try {
    const existingRecord = await xata.db['questions-completed']
      .filter({
        userid: userId,
        userquestion: question,
      })
      .getFirst();

    if (existingRecord) {
      // Update existing record
      await xata.db['questions-completed'].update(existingRecord.id, {
        completed: newCompleted,
      });
    } else {
      // Create new record
      await xata.db['questions-completed'].create({
        userid: userId,
        userquestion: question,
        completed: newCompleted,
        upvote: false,
        downvote: false,
      });
    }
  } catch (error) {
    console.error('Error updating completion status:', error);
    throw error;
  }
}

export async function fetchUserProgress(userId: string, question: string) {
    const xata = getXataClient(); // Initialize Xata client
  
    try {
      const existingRecord = await xata.db['questions-completed']
        .filter({
          userid: userId,
          userquestion: question,
        })
        .getFirst();
  
      if (existingRecord) {
        // Extract the necessary properties to a plain object
        const { completed, upvote, downvote } = existingRecord;
  
        return {
          completed: completed || false,
          upvote: upvote || false,
          downvote: downvote || false,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  }

  export async function fetchCompletionQuestions(userId: string) {
    const xata = getXataClient(); // Initialize Xata client
  
    try {
      // Fetch all records from 'questions-completed' where userid == userId and completed == true
      const completedRecords = await xata.db['questions-completed']
        .filter({ userid: userId, completed: true })
        .getAll();
  
      // Extract the 'userquestion' field from the records
      const completedQuestions = completedRecords.map((record) => record.userquestion);
      
      return completedQuestions;
    } catch (error) {
      console.error('Error fetching completed questions:', error);
      return [];
    }
  }




export async function SendQuestion(question: string, selectedFirm: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  function QuestionTemplateEmail({ question, selectedFirm }: any) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
        <h2>New Question Submission</h2>
        <p><strong>Question:</strong> {question}</p>
        <p><strong>Firm:</strong> {selectedFirm}</p>
        <p>Thank you for your submission!</p>
      </div>
    );
  }

  try {
    await resend.emails.send({
      from: 'Feedback <feedback@coachquant.com>',
      to: ['nandomandi123@gmail.com'],
      subject: 'New Question Received',
      react: <QuestionTemplateEmail question={question} selectedFirm={selectedFirm} />,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}


