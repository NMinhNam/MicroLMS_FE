import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-vibe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-vibe.html',
  styleUrl: './profile-vibe.css',
})
export class ProfileVibe {
  // Learner stats
  user = {
    name: 'Alex Rivera',
    handle: '@arivera_codes',
    level: 14,
    xp: 8450,
    nextLevelXp: 10000,
    rank: 128,
    badgesCount: 12
  };

  // Badge list
  badges = [
    { title: 'Early Bird', icon: '🌅', color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Quiz Master', icon: '🧠', color: 'bg-purple-100 text-purple-600' },
    { title: '7-Day Streak', icon: '🔥', color: 'bg-orange-100 text-orange-600' },
    { title: 'Code Ninja', icon: '🥷', color: 'bg-slate-100 text-slate-600' }
  ];

  // Leaderboard data
  leaderboard = [
    { rank: 1, name: 'Elena S.', xp: 24500, avatar: '👤' },
    { rank: 2, name: 'Marcus K.', xp: 19200, avatar: '👤' },
    { rank: 3, name: 'Sarah J.', xp: 18450, avatar: '👤' },
    { rank: 128, name: 'Alex R. (You)', xp: 8450, avatar: 'AR', isUser: true }
  ];

  /**
   * Action for viewing full rankings
   */
  viewFullRankings() {
    Swal.fire({
      title: 'Global Leaderboard',
      text: 'The full global rankings are calculated every 24 hours. You are currently in the top 15%!',
      icon: 'info',
      confirmButtonColor: '#6366f1'
    });
  }

  /**
   * Simulates profile editing
   */
  editProfile() {
    Swal.fire({
      title: 'Edit Identity',
      input: 'text',
      inputLabel: 'Display Name',
      inputValue: this.user.name,
      showCancelButton: true,
      confirmButtonColor: '#6366f1'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.user.name = result.value;
        Swal.fire('Updated!', 'Your profile has been saved.', 'success');
      }
    });
  }
}
