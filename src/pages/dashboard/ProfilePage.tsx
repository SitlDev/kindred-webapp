import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { mockServer } from '../../services/mockData';
import type { Review, User } from '../../types';
import { Award, ShieldCheck, Sparkles, Check, HelpCircle, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function ProfilePage() {
  const { user } = useAuthStore();
  
  // State
  const [profile, setProfile] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewTag, setReviewTag] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await mockServer.getUserProfile(user.id);
      if (res) {
        setProfile(res.user);
        setReviews(res.reviews);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    if (!comment) {
      toast.error('Please write a feedback comment.');
      return;
    }

    setSubmitting(true);
    try {
      const tagList = reviewTag ? [reviewTag] : ['Mentoring Support'];
      await mockServer.submitReview(
        'peer-1', // Mock peer reviewer
        'Liam Vance (Stanford Researcher)',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        user.id,
        rating,
        comment,
        tagList
      );

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A574', '#C4956D', '#3D5941']
      });

      toast.success('Review submitted successfully! Recalculating Trust Score...');
      setComment('');
      setReviewTag('');
      setRating(5);
      
      // Reload profile to show newly recalculated scores and review list!
      await loadProfile();
    } catch (err) {
      toast.error('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="py-20 text-center text-charcoal/40 text-sm animate-pulse text-left">
        Syncing user profile and trust scores...
      </div>
    );
  }

  // Calculate detailed Trust Score breakdowns
  const ratingWeight = profile.average_rating ? (profile.average_rating * 0.5) : 1.25;
  const streakWeight = Math.min(1.5, (profile.check_in_streak || 0) * 0.1);
  const swapWeight = Math.min(2.0, (profile.help_swaps_completed || 0) * 0.05);

  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PUBLIC CARD & VERIFIED BADGES */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main User Card */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={profile.profile_photo_url}
                alt={profile.display_name}
                className="w-24 h-24 rounded-full object-cover border-2 border-clay mx-auto shadow-md"
              />
              {profile.profile_photo_verified && (
                <span className="absolute bottom-1 right-1 bg-sage text-white p-1 rounded-full border-2 border-white shadow-sm" title="Photo verified">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">{profile.display_name}</h3>
              <p className="text-xs text-charcoal/60 mt-1">📍 {profile.location_city}</p>
            </div>

            {profile.bio && (
              <p className="text-xs text-charcoal/80 leading-relaxed font-sans px-2">
                "{profile.bio}"
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-1.5 pt-2 border-t border-charcoal/5">
              {profile.skills.map(s => (
                <span key={s} className="bg-cream text-charcoal text-[9px] font-mono px-2 py-0.5 rounded border border-charcoal/5">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Domain Badges List */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-charcoal text-base">Verified Credentials</h4>
            
            <div className="space-y-2.5">
              {profile.work_email_verified ? (
                <div className="bg-sage/5 border border-sage/10 rounded-2xl p-3 flex gap-3 items-center">
                  <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
                  <div className="text-xs text-left leading-normal">
                    <span className="font-bold text-sage block">Work Domain Verified</span>
                    <span className="text-charcoal/70">{profile.job_title} @ {profile.company_name}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-cream/45 border border-charcoal/5 rounded-2xl p-3 flex gap-3 items-center opacity-60">
                  <HelpCircle className="w-5 h-5 text-charcoal/40 shrink-0" />
                  <span className="text-xs text-charcoal/50 font-sans">No verified company email (Google, Stripe)</span>
                </div>
              )}

              {profile.school_email_verified ? (
                <div className="bg-sage/5 border border-sage/10 rounded-2xl p-3 flex gap-3 items-center">
                  <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
                  <div className="text-xs text-left leading-normal">
                    <span className="font-bold text-sage block">School Domain Verified</span>
                    <span className="text-charcoal/70">{profile.department} • {profile.university_name}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-cream/45 border border-charcoal/5 rounded-2xl p-3 flex gap-3 items-center opacity-60">
                  <HelpCircle className="w-5 h-5 text-charcoal/40 shrink-0" />
                  <span className="text-xs text-charcoal/50 font-sans">No verified university domain (Stanford, MIT)</span>
                </div>
              )}

              {profile.is_founding_member && (
                <div className="bg-ochre/10 border border-ochre/20 rounded-2xl p-3 flex gap-3 items-center text-glow-ochre">
                  <Award className="w-5 h-5 text-ochre shrink-0" />
                  <div className="text-xs text-left leading-normal text-ochre">
                    <span className="font-bold block">Founding Member Circle</span>
                    <span>Slot #{profile.founding_member_number} Joined</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DYNAMIC TRUST SCORE PANEL & FEED */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Trust Score Breakdown Board */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <div className="flex justify-between items-start border-b border-charcoal/5 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">Covenant Trust score</h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Calculated in real time through verified streaking and contracts.</p>
              </div>
              <div className="bg-ochre text-white text-base font-serif font-bold px-4 py-2 rounded-xl text-glow-ochre flex items-center gap-1 shrink-0">
                <Star className="w-4 h-4 fill-white text-white" />
                <span>{profile.trust_score} / 5.0</span>
              </div>
            </div>

            {/* Weights lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cream/35 border border-charcoal/5 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block">Feedback Rating Weight</span>
                <span className="text-lg font-serif font-bold text-charcoal">+{ratingWeight.toFixed(2)}</span>
                <span className="text-[10px] text-charcoal-muted block">Based on avg rating ⭐ {profile.average_rating || 0}</span>
              </div>

              <div className="bg-cream/35 border border-charcoal/5 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block">Streak Streak weight</span>
                <span className="text-lg font-serif font-bold text-charcoal">+{streakWeight.toFixed(2)}</span>
                <span className="text-[10px] text-charcoal-muted block">Based on 🔥 {profile.check_in_streak || 0} streak days</span>
              </div>

              <div className="bg-cream/35 border border-charcoal/5 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block">Swaps Completed weight</span>
                <span className="text-lg font-serif font-bold text-charcoal">+{swapWeight.toFixed(2)}</span>
                <span className="text-[10px] text-charcoal-muted block">Based on {profile.help_swaps_completed || 0} complete swaps</span>
              </div>
            </div>

            <div className="text-[11px] text-charcoal-muted leading-relaxed pt-2">
              💡 <strong>Integrity Signal:</strong> Verified work/school credentials instantly provide a one-time trust multiplier (+0.3). Higher trust scores increase matching alignment weight and discoverability prominence.
            </div>
          </div>

          {/* Sandbox Peer Feedback Form (DYNAMIC ADDITION) */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-ochre animate-pulse" />
              <span>Sandbox Review Simulator</span>
            </h3>
            <p className="text-xs text-charcoal-muted -mt-2">
              Submit simulated peer feedback to watch the averages and Trust Score recalculate in real-time!
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Rating Star</label>
                <select
                  value={rating}
                  onChange={e => setRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none font-bold"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5</option>
                  <option value="4">⭐⭐⭐⭐ 4</option>
                  <option value="3">⭐⭐⭐ 3</option>
                  <option value="2">⭐⭐ 2</option>
                  <option value="1">⭐ 1</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Skill Focus Tag</label>
                <select
                  value={reviewTag}
                  onChange={e => setReviewTag(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none"
                >
                  <option value="">Select Tag...</option>
                  {profile.skills.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Peer Feedback Comment</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam gave extremely professional system design mentorship..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ochre text-white text-xs font-semibold py-3 rounded-xl hover:bg-ochre/90 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Peer Reviews List */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-charcoal">Peer Feedback Feed</h3>
            
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-10 text-charcoal/40 text-xs">
                  No peer reviews submitted yet. Submit a sandbox feedback above to verify!
                </div>
              ) : (
                reviews.map(rev => (
                  <div
                    key={rev.id}
                    className="border border-charcoal/5 rounded-2xl p-4 space-y-3 bg-cream/10 animate-fade-in"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2.5">
                        <img
                          src={rev.reviewer_photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                          alt={rev.reviewer_name}
                          className="w-9 h-9 rounded-full object-cover border border-clay shrink-0"
                        />
                        <div className="text-left">
                          <h4 className="font-serif font-bold text-charcoal text-xs leading-normal">
                            {rev.reviewer_name}
                          </h4>
                          <span className="text-[9px] text-charcoal/40 block">
                            Reviewed on: {new Date(rev.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-ochre font-bold text-xs shrink-0">
                        <Star className="w-3.5 h-3.5 fill-ochre text-ochre" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal/80 italic leading-relaxed">
                      "{rev.comment}"
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1.5 border-t border-charcoal/5">
                      {rev.tags.map(t => (
                        <span key={t} className="bg-sage/10 text-sage border border-sage/20 text-[9px] font-bold px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
