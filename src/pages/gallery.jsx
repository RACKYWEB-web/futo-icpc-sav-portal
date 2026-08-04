import { trainingPhotos, dutyPhotos } from '../data/mockData.js'
import { SectionHeader, GalleryPhotoCard } from '../components/Cards.jsx'

export default function Gallery() {
  return (
    <div className="container-page section-pad py-16 md:py-20">
      <SectionHeader eyebrow="Gallery" title="Drills, duty and fitness training" sub="Memories from the Vanguard's road drills, fitness sessions and official duties on campus." />

      <div className="eyebrow mb-4">Fitness & road drills</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
        {trainingPhotos.map((img, i) => (
          <GalleryPhotoCard key={i} image={img} aspect="aspect-[3/4]" />
        ))}
      </div>

      <div className="eyebrow mb-4">ICPC SAV Drills Memories</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dutyPhotos.map((img, i) => (
          <GalleryPhotoCard key={i} image={img} aspect="aspect-[3/4]" />
        ))}
      </div>
    </div>
  )
}