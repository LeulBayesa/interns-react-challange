const ActorDetail = ({ actor }) => {
  return (
    <div className="mt-2 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
          <span className="text-4xl font-bold text-gray-700">{actor.name[0]}</span>
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 ml-6">{actor.name}</h2>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Gender', value: actor.gender },
          { label: 'Height', value: `${actor.height} cm` },
          { label: 'Mass', value: `${actor.mass} kg` },
          { label: 'Hair Color', value: actor.hair_color },
          { label: 'Skin Color', value: actor.skin_color },
          { label: 'Eye Color', value: actor.eye_color },
          { label: 'Birth Year', value: actor.birth_year },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-lg text-gray-800">
            <span className="font-medium text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorDetail;
