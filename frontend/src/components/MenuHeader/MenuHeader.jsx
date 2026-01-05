const MenuHeader = () => (
  <section className="flex flex-col gap-6 mb-8">
    {/* Hero Section */}
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwmZtAKbTDkQ_1xIjgN4i3pXQKC9Itw39a7RBJY7tJEKP4NgDieYUesl94k9e5KFpHvDmq88iAfHxiROHC3iQTBae512EzrNhlLGjM9_SpBhXkNRjUQtCryiU5qqClDw-JVTayuFt2MKJp9eXpGYw9kIDiimy8fXYFndlBKD_sb1ciauiRohrSwymMPRDpIvkQqP7DVINrGPHdrmcfgAxwoymRJIWrH11mlMyUym4QoR4usSwVN0qPNw9sHERdRrRHppxl9WWFW14")'}}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">Bella Italia Trattoria</h1>
          <p className="text-gray-200 text-sm md:text-base font-medium opacity-90">Authentic Italian flavors</p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white">
          <span className="material-symbols-outlined text-yellow-400 fill-1">star</span>
          <span className="font-bold text-lg">4.8</span>
          <span className="text-xs opacity-80">(500+ ratings)</span>
        </div>
      </div>
    </div>

    {/* Info Bar */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
      {[
        { icon: 'restaurant', label: 'Cuisine', value: 'Italian, Pizza, Pasta' },
        { icon: 'schedule', label: 'Delivery Time', value: '25-35 min • Free' },
        { icon: 'location_on', label: 'Address', value: '123 Culinary Ave' }
      ].map((info, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined">{info.icon}</span>
          </div>
          <div>
            <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{info.label}</p>
            <p className="font-medium">{info.value}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default MenuHeader;