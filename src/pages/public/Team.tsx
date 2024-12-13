import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  linkedinUrl: string;
  imageUrl: string;
  department: string;
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const { getDocuments } = useFirestore("team");

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getDocuments([]);
      setMembers(data as TeamMember[]);
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-xl text-gray-300">
            Meet the passionate individuals driving innovation at E-Cell VITB
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-indigo-400 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-indigo-300">{member.position}</p>
                <p className="text-sm text-gray-400">{member.department}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
