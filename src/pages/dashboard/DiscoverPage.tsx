import { useEffect, useState } from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import { useAuthStore } from '../../store/authStore';
import { Search, Flame, Send, MapPin, Coffee, Users, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import type { User, Event } from '../../types';

const ALL_VALUES = ['Continuous Learning', 'Empathy', 'Rootedness', 'Deep Inquiry', 'Aesthetic Calm', 'Trustworthiness', 'Integrity', 'Long-term Thinking'];

export default function DiscoverPage() {
  const { user } = useAuthStore();
  const { mentors, events, loading, setFilters, fetchDiscoveryData, rsvpToEvent } = useDiscoveryStore();

  const [searchSkill, setSearchSkill] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [minTrust, setMinTrust] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'mentors' | 'events'>('mentors');

  // Load initial discovery data
  useEffect(() => {
    fetchDiscoveryData();
  }, []);

  const handleFilterChange = (skillVal: string, valueVal: string, trustVal: number) => {
    setFilters({
      skill: skillVal,
      value: valueVal,
      trust: trustVal
    });
  };

  const handleClearFilters = () => {
    setSearchSkill('');
    setSelectedValue('');
    setMinTrust(0);
    setFilters({ skill: '', value: '', trust: 0 });
    toast.success('Filters cleared.');
  };

  const handleRsvp = async (eventId: string, status: 'going' | 'interested' | 'declined') => {
    if (!user) return;
    const success = await rsvpToEvent(user.id, eventId, status);
    if (success) {
      if (status === 'going') {
        toast.success('RSVP confirmed! You are registered for this event.');
      } else {
        toast.success('Event interest saved.');
      }
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-charcoal/10 pb-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-charcoal">Discovery Hub</h2>
          <p className="text-xs text-charcoal-muted mt-1">Connect with verified professionals and values-aligned local events.</p>
        </div>
        
        {/* Responsive Dual Tabs */}
        <div className="bg-cream/45 border border-charcoal/8 p-1 rounded-xl flex gap-1 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex-1 md:flex-none px-4.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mentors'
                ? 'bg-sage text-white shadow-sm'
                : 'text-charcoal/70 hover:text-sage'
            }`}
          >
            Mentors Grid
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 md:flex-none px-4.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'events'
                ? 'bg-sage text-white shadow-sm'
                : 'text-charcoal/70 hover:text-sage'
            }`}
          >
            Local Workshops
          </button>
        </div>
      </div>

      {/* Filter Panel (Visible in both grids) */}
      <div className="bg-white border border-charcoal/8 rounded-3xl p-5.5 shadow-sm space-y-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search Skill */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Search Skill</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              placeholder="e.g. React, ML, Design..."
              value={searchSkill}
              onChange={e => {
                setSearchSkill(e.target.value);
                handleFilterChange(e.target.value, selectedValue, minTrust);
              }}
              className="w-full pl-9.5 pr-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none"
            />
          </div>
        </div>

        {/* Value dropdown */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Values Alignment</label>
          <select
            value={selectedValue}
            onChange={e => {
              setSelectedValue(e.target.value);
              handleFilterChange(searchSkill, e.target.value, minTrust);
            }}
            className="w-full px-3 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none font-medium"
          >
            <option value="">Any Core Value</option>
            {ALL_VALUES.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Trust Score Filter */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Min. Trust Score</label>
          <select
            value={minTrust}
            onChange={e => {
              const val = parseFloat(e.target.value);
              setMinTrust(val);
              handleFilterChange(searchSkill, selectedValue, val);
            }}
            className="w-full px-3 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none font-medium"
          >
            <option value="0">Any Trust Rating</option>
            <option value="4.0">⭐ 4.0+ High Trust</option>
            <option value="4.5">⭐ 4.5+ Rooted Expert</option>
            <option value="4.8">⭐ 4.8+ Core Leader</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="md:col-span-1">
          <button
            onClick={handleClearFilters}
            className="w-full bg-cream border border-charcoal/10 hover:bg-clay-light hover:text-clay text-charcoal text-xs font-semibold py-3 rounded-xl transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal/40 text-sm animate-pulse">
          Filtering values-aligned listings...
        </div>
      ) : (
        <>
          {/* MENTORS GRID TAB */}
          {activeTab === 'mentors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.length === 0 ? (
                <div className="col-span-full py-16 text-center text-charcoal/40 text-xs">
                  No mentors matching current filters. Try relaxing your parameters!
                </div>
              ) : (
                mentors.map((mentor: User) => (
                  <div
                    key={mentor.id}
                    className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-4 hover-premium flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {/* Mentor Card Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img
                            src={mentor.profile_photo_url}
                            alt={mentor.display_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-clay"
                          />
                          <div className="text-left">
                            <h3 className="font-serif font-bold text-charcoal text-base flex items-center gap-1.5">
                              {mentor.display_name}
                              {mentor.is_founding_member && (
                                <span title="Founding Member Circle" className="text-xs">🏆</span>
                              )}
                            </h3>
                            <p className="text-[11px] text-charcoal/70 leading-tight">
                              {mentor.job_title} @ {mentor.company_name || mentor.university_name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Verified Badge Domain */}
                      <div className="flex flex-wrap gap-1">
                        {mentor.work_email_verified && (
                          <span className="bg-sage/10 text-sage border border-sage/20 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 shrink-0" />
                            <span>@{mentor.company_domain} verified</span>
                          </span>
                        )}
                        {mentor.school_email_verified && (
                          <span className="bg-sage/10 text-sage border border-sage/20 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 shrink-0" />
                            <span>@{mentor.university_domain} verified</span>
                          </span>
                        )}
                        <span className="bg-ochre/10 text-ochre border border-ochre/20 text-[9px] font-bold px-2 py-0.5 rounded text-glow-ochre">
                          ⭐ {mentor.trust_score} Trust Rating
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3">
                        {mentor.bio}
                      </p>

                      {/* Skills Mono Badges */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block">Teaching Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {mentor.skills.map((s: string) => (
                            <span key={s} className="bg-cream/70 text-charcoal text-[9px] font-mono px-2 py-0.5 rounded border border-charcoal/5">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Core Values alignment */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-charcoal/40 tracking-wider block">Alignment Values:</span>
                        <div className="flex flex-wrap gap-1">
                          {mentor.values.map((v: string) => (
                            <span key={v} className="bg-clay-light text-clay text-[9px] font-sans font-medium px-2 py-0.5 rounded-full border border-clay/10">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-charcoal/5 flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-[10px] text-charcoal/50">
                        <Flame className="w-3.5 h-3.5 fill-clay text-clay" />
                        <span>{mentor.check_in_streak} Streak Days</span>
                      </div>
                      <Link
                        to={`/messages?userId=${mentor.id}&action=propose`}
                        className="bg-sage text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl hover:bg-sage-hover hover:scale-102 transition-all flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Mentoring</span>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* LOCAL WORKSHOPS TAB */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.length === 0 ? (
                <div className="col-span-full py-16 text-center text-charcoal/40 text-xs">
                  No upcoming workshops matching current filters.
                </div>
              ) : (
                events.map((event: Event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-charcoal/8 rounded-3xl overflow-hidden shadow-sm space-y-4 flex flex-col justify-between hover-premium"
                  >
                    {/* Banner Image */}
                    <div className="relative h-44 w-full bg-cream">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      {event.is_founding_member_only && (
                        <span className="absolute top-3 right-3 bg-ochre text-white text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded shadow-md">
                          🏆 Founding circle only
                        </span>
                      )}
                    </div>

                    {/* Event details block */}
                    <div className="px-6 pb-6 space-y-3">
                      <div>
                        <h3 className="font-serif font-bold text-charcoal text-lg line-clamp-1">{event.title}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mt-1">
                          <MapPin className="w-3.5 h-3.5 text-clay" />
                          <span>{event.location_name} • {event.location_city}</span>
                        </div>
                      </div>

                      <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      {/* Dates */}
                      <div className="flex items-center gap-1 text-[11px] text-sage font-medium bg-sage/5 px-2.5 py-1.5 rounded-xl border border-sage/10 w-fit">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>
                          {new Date(event.start_time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                          {new Date(event.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Attendee indicators */}
                      <div className="flex items-center justify-between text-[11px] text-charcoal/50 border-t border-charcoal/5 pt-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-clay" />
                          <span>{event.current_attendees} / {event.capacity} registered</span>
                        </span>
                        
                        {/* RSVP Action Toggles */}
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleRsvp(event.id, 'going')}
                            className="bg-sage text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-sage-hover transition-colors"
                          >
                            Going
                          </button>
                          <button
                            onClick={() => handleRsvp(event.id, 'interested')}
                            className="bg-cream hover:bg-cream-dark text-charcoal text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-charcoal/10 transition-colors"
                          >
                            Interested
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
